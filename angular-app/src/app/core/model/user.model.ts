import { ActivityModel } from './activity.model';

export class UserModel {
    id: string;
    mail: string;
    name: string;
    activities: ActivityModel[];
}
