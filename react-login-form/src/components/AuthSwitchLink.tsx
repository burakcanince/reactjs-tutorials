import { Link } from 'react-router-dom';

interface AuthSwitchLinkProps {
  question: string;
  label: string;
  to: string;
}

export const AuthSwitchLink = ({ question, label, to }: AuthSwitchLinkProps) => {
  return (
    <p className="text-center text-sm text-slate-500">
      {question}{' '}
      <Link className="font-semibold text-blue-600 hover:underline" to={to}>
        {label}
      </Link>
    </p>
  );
};
