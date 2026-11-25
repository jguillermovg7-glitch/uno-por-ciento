import Plantilla from "../_plantilla";
import { dentistas, metaDe } from "../_datos";

export const metadata = metaDe(dentistas);

export default function Page() {
  return <Plantilla cfg={dentistas} />;
}
