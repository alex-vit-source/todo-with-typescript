import { makeAutoObservable } from "mobx"
import { ITodo, TTodos, TCards } from '../interfaces';


declare var confirm: (str: string) => boolean;

class Todostore {
    cards: TTodos[] = [];
    counter: number = 0;
    tempArr: string[] = ['dfg', 'dfgd'];
    constructor() {
        makeAutoObservable(this)
    }

    showCards() {
        console.log(this.cards);

    }

    addHandler = (cardId: number, title: string) => {

        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        }
        //setTodos([newTodo, ...todos])
        let tempCards = this.cards.map((item, index) => {
            if (cardId === index) {
                item.push(newTodo);
            }
            return item
        });

        this.cards = [...tempCards];
    }

    addCardHandler = () => {

        console.log("AddHandlerCard");
        const newCard: TTodos =

            [
                {
                    title: 'Test5',
                    id: Date.now(),
                    completed: false
                }

            ];
        let tempCards = this.cards;
        tempCards.push(newCard);
        //setTodos([newTodo, ...todos])
        //setCards(tempCards)// setCards(prev => [newCard, ...prev])
        this.cards = [...tempCards];
        console.log(this.cards);
    }

    removeCardHandler = (cardId: number) => {
        const remove = confirm('Вы уверены что хотите удалить эту карточку?') // window.confirm('Вы уверены что хотите удалить эту запись?')
        if (remove) this.cards = this.cards.filter((item, index) => index !== cardId);
    }


}

export default new Todostore()