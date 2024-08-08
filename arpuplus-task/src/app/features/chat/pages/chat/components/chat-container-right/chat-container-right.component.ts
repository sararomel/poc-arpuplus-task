import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatHeaderRightComponent } from "../chat-header-right/chat-header-right.component";

@Component({
    selector: 'app-chat-container-right',
    standalone: true,
    templateUrl: './chat-container-right.component.html',
    styleUrl: './chat-container-right.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ChatHeaderRightComponent]
})
export class ChatContainerRightComponent {

}
