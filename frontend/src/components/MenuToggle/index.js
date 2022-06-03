import { motion } from "framer-motion";

//Styles
import "./MenuToggle.scss";

const transition = { duration: 0.3 };

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <div onClick={toggle} className="menu_toggle">
            <svg width="23" height="23" viewBox="0 0 23 23">
                <motion.path
                    fill="transparent"
                    strokeLinecap="round"
                    strokeWidth="3"
                    animate={isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: {
                            d: "M 2 2.5 L 20 2.5",
                            stroke: "#4E4D51",
                        },
                        open: {
                            d: "M 3 16.5 L 17 2.5",
                            stroke: "#4E4D51",
                        },
                    }}
                    transition={transition}
                />
                <motion.path
                    fill="transparent"
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M 2 9.423 L 20 9.423"
                    stroke="#4E4D51"
                    animate={isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={transition}
                />
                <motion.path
                    fill="transparent"
                    strokeLinecap="round"
                    strokeWidth="3"
                    animate={isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: {
                            d: "M 2 16.346 L 20 16.346",
                            stroke: "#4E4D51",
                        },
                        open: {
                            d: "M 3 2.5 L 17 16.346",
                            stroke: "#4E4D51",
                        },
                    }}
                    transition={transition}
                />
            </svg>
        </div>
    );
};

export default MenuToggle;
