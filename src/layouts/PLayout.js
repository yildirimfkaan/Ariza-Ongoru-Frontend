
import AkkoNavbar from '../components/AkkoNavbar';


function PLayout({ ...props }) {
  const { children } = props;
  return (
    <>
      <AkkoNavbar {...props} />
      <div  style={{background:"#f2f2f2"}}>
        {children}
      </div>
      
    </>
  );
}

export default PLayout;
