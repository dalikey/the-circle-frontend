import { AuthService } from "src/app/services/authServices/auth.service";
import { LoggerService } from "src/app/services/loggerServices/logger.service";
import { UserService } from "src/app/services/userServices/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { securityService } from "src/app/services/authServices/security";
import { VidStream } from "src/app/services/vidStream/VidStream.service";

@Component({
  selector: "app-stream-page",
  templateUrl: "./stream-page.component.html",
  styleUrls: ["./stream-page.component.css"],
})
export class StreamPageComponent implements OnInit {
  IsFollowing: boolean = false;
  streamerId!: number;
  followerId!: number;
  NewStream: any;
  HostId: number;
  StreamId: number;

  constructor(
    private route: ActivatedRoute,
    private loggerService: LoggerService,
    private userService: UserService,
    private authService: AuthService,
    private VidService: VidStream,
    private secureService: securityService
  ) {
    this.HostId = 0;
    this.NewStream = { id: 1 };
    this.StreamId = 0;
  }

  ngOnInit(): void {
    this.streamerId = this.route.snapshot.params["id"];

    this.authService.currentToken$.subscribe((user: any) => {
      this.followerId = user;
    });

    this.checkFollowerExists();

    console.log("Hello page algemeen");
    this.CheckParams();
    //Use router to get url parameters in order to get transparent user id
    //Get latest stream.
  }

  checkFollowerExists(): void {
    this.userService
      .checkFollowerExists(this.streamerId, this.followerId)
      .subscribe(
        (isFollowing: boolean) => {
          this.IsFollowing = isFollowing;
          // TODO: Change later
          this.loggerService.addLog(`StreamPage - Check Follower exists: ${isFollowing}`);
        },
        (error: any) => {
          console.error("Error checking follower:", error);
        }
      );
  }

  CheckParams() {
    this.route.paramMap.subscribe((v) => {
      const id: string = v.get("id")!;
      console.log(`De ONE PIECE IS ID ${id}`);
      if (id) {
        this.HostId = parseInt(id);
        this.GetLatestStream(this.HostId);
      } else {
        console.log("Geen params");
      }
    });
  }

  GetLatestStream(HostId: number) {
    console.log("Get latest stream");
    this.VidService.GetStreamOfHost(HostId).subscribe((ol) => {
      const sign = ol.signature;

      const IsValid = this.secureService.verify(sign.originalData, sign);

      if (IsValid) {
        this.NewStream = sign.originalData;
      } else {
        console.warn("No stream is running");
      }
    });
  }
}
