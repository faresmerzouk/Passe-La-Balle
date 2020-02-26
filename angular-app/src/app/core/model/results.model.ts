import { CreateResult } from './create-result.model';
import { JoinResult } from './join-result.model';

export class Results {

    create: CreateResult[]; // Résultats des lieux sur lesquels créer une activité
    join: JoinResult[]; // Résultats des activités à joindre

}
