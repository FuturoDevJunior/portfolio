declare module 'framer-motion' {
    import React from 'react';

    export type VariantType = { [key: string]: unknown };

    export type MotionProps = {
        initial?: VariantType | string;
        animate?: VariantType | string;
        exit?: VariantType | string;
        variants?: Record<string, VariantType>;
        transition?: Record<string, unknown>;
        whileHover?: VariantType | string;
        whileTap?: VariantType | string;
        className?: string;
        style?: React.CSSProperties;
        [key: string]: unknown;
    };

    export type MotionComponent<T = HTMLElement> = React.ForwardRefExoticComponent<
        T & MotionProps & React.RefAttributes<HTMLElement>
    >;

    export const motion: {
        div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>;
        span: MotionComponent<React.HTMLAttributes<HTMLSpanElement>>;
        button: MotionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>;
        a: MotionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
        ul: MotionComponent<React.HTMLAttributes<HTMLUListElement>>;
        ol: MotionComponent<React.HTMLAttributes<HTMLOListElement>>;
        li: MotionComponent<React.LiHTMLAttributes<HTMLLIElement>>;
        p: MotionComponent<React.HTMLAttributes<HTMLParagraphElement>>;
        h1: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
        h2: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
        h3: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
        h4: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
        h5: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
        h6: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
        img: MotionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
        svg: MotionComponent<React.SVGAttributes<SVGElement>>;
        path: MotionComponent<React.SVGAttributes<SVGPathElement>>;
        circle: MotionComponent<React.SVGAttributes<SVGCircleElement>>;
    };

    export interface ScrollOptions {
        target?: React.RefObject<HTMLElement>;
        offset?: string[] | number[];
    }

    export interface ScrollResult {
        scrollYProgress: number;
        scrollXProgress: number;
    }

    export function useScroll(options?: ScrollOptions): ScrollResult;
    export function useTransform(input: number, inputRange: number[], outputRange: Array<number | string>): number | string;
} 