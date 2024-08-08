import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideBarLeftComponent } from '../side-bar-left/side-bar-left.component';
import { ChattHeaderComponent } from '../chat-header/chat-header.component';
import { RouterOutlet } from '@angular/router';
import { ChatHeaderRightComponent } from "../chat-header-right/chat-header-right.component";
import { ChatContainerRightComponent } from "../chat-container-right/chat-container-right.component";

@Component({
    selector: 'app-chat-templete',
    standalone: true,
    templateUrl: './chat-templete.component.html',
    styleUrl: './chat-templete.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SideBarLeftComponent, ChattHeaderComponent, RouterOutlet, ChatHeaderRightComponent, ChatContainerRightComponent]
})
export class ChatTempleteComponent {}
