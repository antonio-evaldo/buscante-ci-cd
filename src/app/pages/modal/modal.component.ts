import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

import { Livro } from '../../models/interfaces';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() livro!: Livro;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter<boolean>()

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    if (this.statusModal) {
      this.fecharModal();
    }
  }

  fecharModal() {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal)
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'overflow', 'scroll');
  }

  esconderScroll(){
    if(this.statusModal == true ) {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'overflow', 'hidden');
    }
  }

  lerPrevia() {
    window.open(this.livro.previewLink, '_blank');
  }
}
