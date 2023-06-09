import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { User } from 'src/app/Domain/Models/User';
import { LoggerService } from '../../../services/loggerServices/logger.service';
import { userService } from 'src/app/services/userServices/user.service';

@Component({
    selector: 'app-online-list',
    templateUrl: './online-list.component.html',
    styleUrls: ['./online-list.component.css'],
})
export class OnlineListComponent implements OnInit {
    value: Boolean = true;
    list$: BehaviorSubject<User[] | undefined>;
    constructor(
        public userService: userService,
        private http: HttpClient,
        private logger: LoggerService
    ) {
        this.list$ = new BehaviorSubject<User[] | undefined>(undefined);
    }

    // TODO: Link to stream function needs to be implemented.

    ngOnInit(): void {
        this.logger.trace('converting data to export');
        //this.refresher = this.http.get<User[]>("https://localhost:7058/api/user");
        this.Refresh(this.DummyData());

        // TODO: Decomment when function works fully
        this.RefreshList();
    }

    RefreshList() {
        console.log('Ophalen streamers US-3');
        //Subscribes to interval.
        interval(2000).subscribe(() => {
            //Next step is to request users to api.
            const ss = this.userService.GetAll().subscribe((e) => {
                console.log(e);
                //Will assign new value to behavioursubject.
                /*value = !value;
        e[0].isOnline = value;*/

                this.Refresh(e);
                //Will unsubscribe, so that this observable can be reused multiple times.
                ss.unsubscribe();
            });
        });
    }

    Refresh(newUserList: User[]) {
        this.list$.next(newUserList);
    }

    DummyData(): User[] {
        return [
            { id: 66, isOnline: true, userName: 'TestDave', followCount: 13 },
            {
                id: 67,
                isOnline: false,
                userName: 'TestLinda',
                followCount: 138,
            },
        ];
    }
}
