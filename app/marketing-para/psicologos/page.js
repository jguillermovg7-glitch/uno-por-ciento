import Plantilla from "../_plantilla";
import { psicologos, metaDe } from "../_datos";

export const metadata = metaDe(psicologos);

export default function Page() {
  return <Plantilla cfg={psicologos} />;
}
