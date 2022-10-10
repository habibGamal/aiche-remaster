import { useState } from "react";

export default function useModalProps() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const close = () => setIsModalOpen(false);
    const open = () => setIsModalOpen(true);
    return { modalProps: { isModalOpen, close }, open }
}