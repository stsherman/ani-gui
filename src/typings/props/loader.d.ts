type LoadingType = "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes";

interface LoaderProps {
    isShown: boolean;
    color? : string;
    height? : any;
    width? : any;
    delay?: number;
    type? : LoadingType;
    className?: string;
}