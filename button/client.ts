namespace modules {
    const INTERNAL_KEY_UP = 2050;
    const INTERNAL_KEY_DOWN = 2051;

    //% fixedInstances
    export class ButtonClient extends jacdac.SensorClient<[number]> {
        constructor(role: string) {
            super(jacdac.SRV_BUTTON, role, "u8");
        }

        connectControllerButton(controllerButton: number) {
            this.start()
            control.internalOnEvent(this.eventId, jacdac.ButtonEvent.Down,
                () => control.raiseEvent(INTERNAL_KEY_DOWN, controllerButton))
            control.internalOnEvent(this.eventId, jacdac.ButtonEvent.Up,
                () => control.raiseEvent(INTERNAL_KEY_UP, controllerButton))
        }

        /**
         * Reads the current x value from the sensor
         */
        //% blockId=jacadacbtispressed block="%button is pressed"
        //% group="Buttons"
        isPressed(): boolean {
            const [value] = this.values();
            return !!value;
        }

        /**
         * Runs code when an event happens on the sensor
         * @param gesture 
         * @param handler 
         */
        //% blockId=jacadacbtnonevent block="on %button $event"
        //% group="Buttons"
        onEvent(event: jacdac.ButtonEvent, handler: () => void) {
            this.registerEvent(event, handler);
        }
    }

    //% fixedInstance whenUsed
    export const button = new ButtonClient("button");
}