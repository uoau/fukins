/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-06-25 18:02:42
 */

let websocket;
let lockReconnect;
let recontentTimer = null;
const handlerList = [];

function websocketReconnect() {
    if (lockReconnect) return;
    lockReconnect = true;

    // 没连接上会一直重连，设置延迟避免请求过多
    if (recontentTimer) {
        clearTimeout(recontentTimer);
    }

    recontentTimer = setTimeout(() => {
        createWebSocket();
        lockReconnect = false;
    }, 5000);
}

function websocketInit() {
    const data = {};

    const heartCheck = {
        timeout: 30000,
        timeoutObj: null,
        serverTimeoutObj: null,
        start() {
            const self = this;
            const { timeout } = this;

            if (this.timeoutObj) {
                clearTimeout(this.timeoutObj);
            }
            if (this.serverTimeoutObj) {
                clearTimeout(this.serverTimeoutObj);
            }

            this.timeoutObj = setTimeout(() => {
                websocket.send(JSON.stringify({
                    ...data,
                    action: 'monitor',
                }));
                self.serverTimeoutObj = setTimeout(() => {
                    websocket.close();
                }, timeout);
            }, timeout);
        },
    };

    websocket.addEventListener('open', () => {
        websocket.send(JSON.stringify({
            ...data,
            action: 'monitor',
        }));

        websocket.push = (info) => {
            websocket.send(JSON.stringify({
                ...data,
                info,
                action: 'push',
            }));
        };

        heartCheck.start();
    });

    websocket.addEventListener('error', () => {
        websocketReconnect();
    });

    websocket.addEventListener('close', () => {
        websocketReconnect();
    });

    websocket.addEventListener('message', () => {
        heartCheck.start();
    });
}

function createWebSocket(url) {
    const noop = () => {};

    if (url) {
        try {
            websocket = new WebSocket(url);
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error(new Error('Failed to construct \'WebSocket\': The URL \'ws://undefined\' is invalid.'));
    }

    if (!websocket) {
        websocket = { addEventListener: noop, push: noop, send: noop, disabled: true };
    }

    websocketInit();

    websocket.add = function (handler) {
        if (handlerList.includes(handler)) return;
        handlerList.push(handler);
    };

    websocket.remove = function (handler) {
        if (!handlerList.includes(handler)) return;
        handlerList.splice(handlerList.findIndex(item => item === handler), 1);
    };

    websocket.addEventListener('message', (e) => {
        handlerList.forEach(handler => handler(JSON.parse(e.data), e));
    });

    return websocket;
}

export default createWebSocket;
