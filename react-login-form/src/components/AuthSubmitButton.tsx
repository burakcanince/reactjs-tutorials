interface AuthSubmitButtonProps {
  label: string;
  loading?: boolean;
}

export const AuthSubmitButton = ({ label, loading }: AuthSubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      disabled={loading}
    >
      {loading ? 'Bekleyin…' : label}
    </button>
  );
};
