const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center h-[30vh]">
      <h3 className="text-3xl text-red-500">{message}</h3>
    </div>
  );
};

export default ErrorMessage;
