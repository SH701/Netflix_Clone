import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RowWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: visible;
  button {
    display: none;
  }
  &:hover button {
    display: flex;
  }
`;

const Row = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  height: 200px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  z-index: 10;
  width: auto;
  height: 40px;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover{
    background-color: rgba(255,255,255,0.5);
  }
`;

const PrevButton = styled(NavButton)`
  left: 0;
`;

const NextButton = styled(NavButton)`
  right: 0;
 
`;

const rowVar = {
  hidden: (dir: boolean) => ({
    x: dir ? window.outerWidth : -window.outerWidth,
  }),
  visible: { x: 0 },
  exit: (dir: boolean) => ({
    x: dir ? -window.outerWidth : window.outerWidth,
  }),
};
interface SliderComponentProps {
  index: number;
  direction: boolean;
  onNext: () => void;
  onPrev: () => void;
  setLeaving: (value: boolean) => void;
  children: React.ReactNode;
}

function SliderComponent({
  index,
  direction,
  onNext,
  onPrev,
  setLeaving,
  children,
}: SliderComponentProps) {
  return (
    <RowWrapper>
      <PrevButton onClick={onPrev}>{FaChevronLeft({})}</PrevButton>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => setLeaving(false)}
      >
        <Row
          custom={direction}
          variants={rowVar}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.3 }}
          key={index}
        >
          {children}
        </Row>
      </AnimatePresence>
      <NextButton onClick={onNext}>{FaChevronRight({})}</NextButton>
    </RowWrapper>
  );
}

export default SliderComponent;