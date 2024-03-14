import IconFire from '../shared/icons/IconFire';

const GenericError: React.FC = () => {
  return (
    <div role="alert" className="alert alert-error m-2">
      <IconFire />
      <span>Oh no! Something seriously bad happened.</span>
    </div>
  );
};

export default GenericError;
