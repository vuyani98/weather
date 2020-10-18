import { trigger, transition, style, state, stagger, animate, keyframes, animation, query} from '@angular/animations';

export const stagAnimation = animation ([
    trigger('stagCard', [
        transition('void => *', [
                    query('void=>*', [ stagger('300ms', [
            animate( '300ms 500ms ease-in', keyframes([
                style({ opacity : '0', transform : 'translateX(50%)', offset : 0}),
                style({ opacity : '0.3', transform : 'translateX(25%)', offset : 0.3}),
                style({ opacity : '1', transform : 'translateX(0)', offset : 1})
            ]))
        ])])
        ])

    ])
]);