import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule, EditorComponent as TinymceEditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [EditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  editorConfig: any;
  content = '';
  placeholders = [
    { id: 'Contacts.FirstName', name: '{Contacts.FirstName}' },
    { id: 'Contacts.LastName', name: '{Contacts.LastName}' },
    { id: 'Contacts.UserName', name: '{Contacts.UserName}' },
    { id: 'Contacts.Email', name: '{Contacts.Email}' },
    { id: 'Contacts.PhoneNumber', name: '{Contacts.PhoneNumber}' },
    { id: 'Contacts.InsertionDate', name: '{Contacts.InsertionDate}' },
    { id: 'Contacts.Active', name: '{Contacts.Active}' },
    { id: 'Contacts.DateOfBirth', name: '{Contacts.DateOfBirth}' }
  ];
  filteredPlaceholders = this.placeholders;
  showDropdown = false;
  currentCaretPosition: any;

  @ViewChild('editor') editorComponent!: TinymceEditorComponent;

  constructor() {
    this.editorConfig = {
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
      setup: (editor: { on: (arg0: string, arg1: (event: any) => void) => void; }): any => {
        editor.on('keydown', event => this.onEditorKeyDown(event, editor));
      }
    };
  }

  onEditorKeyDown(event: KeyboardEvent, editor: any) {
    if (event.key === '{') {
      this.showDropdown = true;
      this.currentCaretPosition = editor.selection.getBookmark(2, true); // Save the current cursor position
      this.filteredPlaceholders = this.placeholders;
    } else if (this.showDropdown && event.key === 'Enter') {
      event.preventDefault();
      this.insertPlaceholder(this.filteredPlaceholders[0]);
    } else if (this.showDropdown && event.key === 'Escape') {
      this.showDropdown = false;
    }
  }

  insertPlaceholder(placeholder: any) {
    const editor = this.editorComponent?.editor; // Safely get the editor instance

    if (editor) {
      editor.selection.moveToBookmark(this.currentCaretPosition);
      editor.insertContent(placeholder.name);
      this.showDropdown = false;
    } else {
      console.error('Editor instance is not available.');
    }
  }

  onPlaceholderClick(placeholder: any) {
    this.insertPlaceholder(placeholder);
  }

  filterPlaceholders(query: string) {
    this.filteredPlaceholders = this.placeholders.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
