
import ClientDetailView from "src/views/client/detail/ClientDetailView";
import { ClientDetailProvider } from "src/views/client/detail/hooks/ClientDetailContext";

const ClientDetail = () => {


  return (
    <ClientDetailProvider>
      <ClientDetailView/>
    </ClientDetailProvider>
  );
};

export default ClientDetail;


