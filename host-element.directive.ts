import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[host-element]'
})
export class HostElementDirective implements OnInit {


  componentRef;
  // COMPONENT MUST BE AN ENTRY COMPONENT
  @Input() component: Component;
  @Input() data;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const component = this.component;
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = this.data;
    this.componentRef.changeDetectorRef.detectChanges();
  }

}
