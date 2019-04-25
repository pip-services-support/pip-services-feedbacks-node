import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { FeedbacksMemoryPersistence } from './FeedbacksMemoryPersistence';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
export declare class FeedbacksFilePersistence extends FeedbacksMemoryPersistence {
    protected _persister: JsonFilePersister<FeedbackV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
