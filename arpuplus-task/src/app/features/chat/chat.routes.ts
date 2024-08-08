import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { SideBarLeftComponent } from './pages/chat/components/side-bar-left/side-bar-left.component';
import { NgModule } from '@angular/core';
import { routes } from '../../app.routes';

export const chatRoutes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'whatsapp',
        component: SideBarLeftComponent,
      },
      {
        path: 'sms',
        component: SideBarLeftComponent,
      },
      {
        path: 'instagram',
        component: SideBarLeftComponent,
      },
      {
        path: 'messenger',
        component: SideBarLeftComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
