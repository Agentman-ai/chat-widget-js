// svg-handler.ts

interface SvgConfig {
    maxWidth?: string;
    maxHeight?: string;
    aspectRatio?: 'preserve' | 'stretch';
    allowAnimation?: boolean;
    allowInteraction?: boolean;
    interactions?: {
      onClick?: (elementId: string) => void;
      onHover?: (elementId: string, isHovering: boolean) => void;
    };
  }
  
  export class SvgHandler {
    private static readonly INTERACTIVE_ELEMENTS = new Set([
      'circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 
      'rect', 'text', 'g'
    ]);
  
    private static readonly ANIMATION_ELEMENTS = new Set([
      'animate', 'animateMotion', 'animateTransform', 'set'
    ]);
  
    private config: SvgConfig;
    private interactiveElements: Map<string, Element> = new Map();
  
    constructor(config: SvgConfig = {}) {
      this.config = {
        maxWidth: '100%',
        maxHeight: '400px',
        aspectRatio: 'preserve',
        allowAnimation: true,
        allowInteraction: true,
        ...config
      };
    }
  
    public processSvg(svgContent: string): string {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, 'image/svg+xml');
      const svg = doc.querySelector('svg');
  
      if (!svg) {
        throw new Error('No SVG element found');
      }
  
      // Add wrapper class for styling
      svg.classList.add('interactive-svg');
  
      // Process animations
      if (this.config.allowAnimation) {
        this.processAnimations(svg as SVGSVGElement);
      } else {
        this.removeAnimations(svg as SVGSVGElement);
      }
  
      // Add interaction attributes
      if (this.config.allowInteraction) {
        this.addInteractivity(svg as SVGSVGElement);
      }
  
      // Add size controls
      this.applySizeControls(svg as SVGSVGElement);
  
      // Generate unique IDs for interactive elements
      this.ensureUniqueIds(svg as SVGSVGElement);
  
      const serializer = new XMLSerializer();
      const processed = serializer.serializeToString(svg);
  
      return this.wrapWithContainer(processed);
    }
  
    private processAnimations(svg: SVGSVGElement): void {
      // Find all animation elements
      const animations = svg.querySelectorAll(
        'animate, animateMotion, animateTransform, set'
      );
  
      animations.forEach(animation => {
        // Ensure animations have proper timing attributes
        if (!animation.hasAttribute('dur')) {
          animation.setAttribute('dur', '1s');
        }
        if (!animation.hasAttribute('repeatCount')) {
          animation.setAttribute('repeatCount', '1');
        }
  
        // Add pause/play capability
        animation.setAttribute('data-animated', 'true');
      });
    }
  
    private removeAnimations(svg: SVGSVGElement): void {
      SvgHandler.ANIMATION_ELEMENTS.forEach(tag => {
        svg.querySelectorAll(tag).forEach(el => el.remove());
      });
    }
  
    private addInteractivity(svg: SVGSVGElement): void {
      SvgHandler.INTERACTIVE_ELEMENTS.forEach(tag => {
        svg.querySelectorAll(tag).forEach(element => {
          // Add interaction attributes
          element.setAttribute('data-interactive', 'true');
          element.setAttribute('tabindex', '0');
          element.setAttribute('role', 'button');
        });
      });
    }
  
    private applySizeControls(svg: SVGSVGElement): void {
      // Ensure viewBox exists
      if (!svg.hasAttribute('viewBox')) {
        const width = svg.getAttribute('width') || '100';
        const height = svg.getAttribute('height') || '100';
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }
  
      // Set size attributes
      svg.setAttribute('width', this.config.maxWidth!);
      svg.setAttribute('height', this.config.maxHeight!);
      
      if (this.config.aspectRatio === 'preserve') {
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      } else {
        svg.setAttribute('preserveAspectRatio', 'none');
      }
    }
  
    private ensureUniqueIds(svg: SVGSVGElement): void {
      const prefix = `-${Date.now()}-`;
      let counter = 0;
  
      const elements = svg.querySelectorAll('[id]');
      elements.forEach(element => {
        const newId = `${prefix}${counter++}`;
        const oldId = element.id;
        
        // Update ID
        element.id = newId;
        
        // Update any references to this ID
        svg.querySelectorAll(`[href="#${oldId}"]`).forEach(ref => {
          ref.setAttribute('href', `#${newId}`);
        });
      });
    }
  
    private wrapWithContainer(svgContent: string): string {
      return `
        <div class="svg-container" 
             style="max-width: ${this.config.maxWidth}; max-height: ${this.config.maxHeight}">
          <div class="svg-controls">
            ${this.config.allowAnimation ? `
              <button class="svg-control" data-action="play">Play</button>
              <button class="svg-control" data-action="pause">Pause</button>
              <button class="svg-control" data-action="reset">Reset</button>
            ` : ''}
            <button class="svg-control" data-action="zoom">Zoom</button>
          </div>
          ${svgContent}
        </div>
      `;
    }
  
    public attachEventListeners(container: HTMLElement): void {
      if (!this.config.allowInteraction) return;
  
      // Animation controls
      if (this.config.allowAnimation) {
        container.querySelector('[data-action="play"]')?.addEventListener('click', 
          () => this.playAnimations(container));
        container.querySelector('[data-action="pause"]')?.addEventListener('click', 
          () => this.pauseAnimations(container));
        container.querySelector('[data-action="reset"]')?.addEventListener('click', 
          () => this.resetAnimations(container));
      }
  
      // Interactive elements
      const svg = container.querySelector('svg');
      if (svg && this.config.interactions) {
        const interactiveElements = svg.querySelectorAll('[data-interactive="true"]');
        
        interactiveElements.forEach(element => {
          if (this.config.interactions?.onClick) {
            element.addEventListener('click', () => {
              this.config.interactions?.onClick?.(element.id);
            });
          }
          
          if (this.config.interactions?.onHover) {
            element.addEventListener('mouseenter', () => {
              this.config.interactions?.onHover?.(element.id, true);
            });
            element.addEventListener('mouseleave', () => {
              this.config.interactions?.onHover?.(element.id, false);
            });
          }
        });
      }
  
      // Zoom functionality
      container.querySelector('[data-action="zoom"]')?.addEventListener('click', 
        () => this.toggleZoom(container));
    }
  
    private playAnimations(container: HTMLElement): void {
      const animations = container.querySelectorAll('[data-animated="true"]');
      animations.forEach(animation => {
        if (animation instanceof SVGAnimationElement) {
          animation.beginElement();
        }
      });
    }
  
    private pauseAnimations(container: HTMLElement): void {
      const animations = container.querySelectorAll('[data-animated="true"]');
      animations.forEach(animation => {
        // Fix: Using the correct method for pausing SVG animations
        if (animation instanceof SVGAnimationElement) {
          // Note: SVG animations don't have a native pause method
          // We can use freeze or end to stop the animation
          animation.setAttribute('repeatCount', '0');
        }
      });
    }
  
    private resetAnimations(container: HTMLElement): void {
      const animations = container.querySelectorAll('[data-animated="true"]');
      animations.forEach(animation => {
        if (animation instanceof SVGAnimationElement) {
          animation.endElement();
        }
      });
    }
  
    private toggleZoom(container: HTMLElement): void {
      container.classList.toggle('svg-zoomed');
    }
  }