import { FC } from "react";
import { TErrorMessage } from "../../types/TErrorMessage";

interface IErrorProps {
  message: TErrorMessage;
}

export const Error: FC<IErrorProps> = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};
