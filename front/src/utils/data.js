import { MdHome } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { GrInProgress } from 'react-icons/gr';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export const navMenus = [
  { idx: 0, icon: <MdHome className="w-5 h-5" />, label: 'Home', to: '/' },
  { idx: 1, icon: <MdFactCheck className="w-4 h-4" />, label: 'Completed', to: '/completed' },
  { idx: 2, icon: <GrInProgress className="w-4 h-4" />, label: 'Proceeding', to: '/proceeding' },
  { idx: 3, icon: <AiOutlineExclamationCircle className="w-4 h-4" />, label: 'Important', to: '/important' },
];
