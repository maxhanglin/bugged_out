import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FirebaseConfigService} from '../../core/service/firebase-config.service';
import {Bug} from '../model/bug';

@Injectable()
export class BugService{

    private bugsDbRef = this.firebaseConfigService.database.ref('/bugs');

    constructor(private firebaseConfigService: FirebaseConfigService) {}

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_added', raw => {
                const bug = raw.val() as Bug;
                obs.next(bug);
            },
            err => {
                obs.throw(err);
            });
        });
    }
}