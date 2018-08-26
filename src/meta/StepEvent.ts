export interface StepEvent extends CustomEvent {
    detail: {
        stepee: HTMLElement;
        steper: HTMLElement;
    }
}