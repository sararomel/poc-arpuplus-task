import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [EditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  editorConfig: any;
  content = '';

  constructor() {
    this.editorConfig = {
      base_url: 'https://cdn.tiny.cloud/1/m8d1o7bynx6hjjt5sf7vmizh4jy6xxy5a3qk828acsv6o4dz/tinymce/6', // Use the latest stable TinyMCE version
      suffix: '.min',
      plugins: 'mentions',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | mentions',
      mentions_selector: 'span[data-mention-id]',
      mentions_fetch: this.fetchMentions.bind(this),
      mentions_menu_complete: this.onMentionComplete.bind(this),
      mentions_item_type: 'profile',
      mentions_menu_min_chars: 1
    };
    
    
  }

  // Mock function to fetch mention data
  fetchMentions(query: string, success: (items: any[]) => void): void {
    console.log('m8d1o7bynx6hjjt5sf7vmizh4jy6xxy5a3qk828acsv6o4dz');
    
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Tom Brown' }
    ];

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    // Map users to mention format
    const mentions = filteredUsers.map(user => ({
      id: user.id,
      name: user.name
    }));

    success(mentions);
  }

  // Method to handle when a mention is selected
  onMentionComplete(editor: any, mention: any): void {
    console.log('Mention selected:', mention);
  }
}
