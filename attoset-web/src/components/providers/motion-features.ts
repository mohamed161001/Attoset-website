// Isolated in its own module so LazyMotion can code-split it into an async
// chunk (loaded after hydration, kept out of the critical JS path).
// domMax includes animations, exit, gestures, whileInView, drag and layout
// (layout/layoutId are used by the feature-cards and views-section pills).
export { domMax as default } from "framer-motion";
