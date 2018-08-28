export interface Collision extends CustomEvent {
    detail: {
        issuer: HTMLElement;
        receiver: HTMLElement;
    }
}