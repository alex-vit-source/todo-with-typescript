import { makeAutoObservable } from "mobx"
import { ITodo, TTodos, AllTables } from '../interfaces';


declare var confirm: (str: string) => boolean;

class Todostore {
    firstInitData: boolean = false;
    cards: TTodos[] = [];
    idTable: number = 0;
    alltables: AllTables = {
        myTables: [
            // {
            //     id: Date.now(),
            //     name: "New Table",
            //     ttodos: [],
            //     shareTo: []
            // },
            // {
            //     id: 2,
            //     name: "New Table 2",
            //     ttodos: [],
            //     shareTo: ['fddgfdc@mail.com', 'badbcd@mail.com']
            // }
        ], accessTo: []
    };
    // counter: number = 0;
    // tempArr: string[] = ['dfg', 'dfgd'];
    access: boolean = false;
    auth: any;
    app: any;
    firestore: any;

    user: any;
    loading: boolean = false;
    error: any;

    visible: boolean = false;

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

        this.alltables.myTables[this.idTable].ttodos = [...tempCards];
    }

    toggleHandler = (cardId: number, todoId: number) => {
        console.log(`${cardId} cardId`);
        console.log(`${todoId} todoId`);
        let tempTodos = this.cards.map((item, index) => {
            if (cardId === index) {
                console.log(item);
                item.forEach(todo => {
                    if (todo.id === todoId) {
                        todo.completed = !todo.completed;
                    }
                });
            }
            return item
        });
        this.cards = [...tempTodos];

        this.alltables.myTables[this.idTable].ttodos = [...tempTodos];
    }

    removeHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
        event.preventDefault();
        const remove = confirm('Вы уверены что хотите удалить эту запись?') // window.confirm('Вы уверены что хотите удалить эту запись?')
        if (remove) {
            let tempTodos = this.cards.map((item, index) => {
                if (cardId === index) {
                    return item.filter(todo => todo.id !== todoId)
                }
                return item
            })
            this.cards = [...tempTodos];

            this.alltables.myTables[this.idTable].ttodos = [...tempTodos];
        }
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
        this.cards = [...tempCards];
        console.log(this.cards);

        this.alltables.myTables[this.idTable].ttodos = [...tempCards];
    }

    removeCardHandler = (cardId: number) => {
        const remove = confirm('Вы уверены что хотите удалить эту карточку?') // window.confirm('Вы уверены что хотите удалить эту запись?')
        if (remove) {
            this.cards = this.cards.filter((item, index) => index !== cardId);
            this.alltables.myTables[this.idTable].ttodos = [...this.cards];
        }
    }

    dndCardHandler = (dragId: number, hoverId: number) => {
        const drugCard = this.cards[dragId];
        const hoverCard = this.cards[hoverId];
        const updatedCard = [...this.cards];
        updatedCard[hoverId] = drugCard;
        updatedCard[dragId] = hoverCard;
        this.cards = [...updatedCard];

        this.alltables.myTables[this.idTable].ttodos = [...updatedCard];

    }

    dndTodoHandler = (cardDragId: number, cardHoverId: number, todoDrugId: number, todoHoverId: number) => {

        const drugTodo = this.cards[cardDragId][todoDrugId];
        const hoverTodo = this.cards[cardHoverId][todoHoverId];

        if (cardDragId === cardHoverId) {
            const updatedCard = [...this.cards];
            updatedCard[cardHoverId][todoDrugId] = hoverTodo;
            const arrBefore = updatedCard[cardHoverId].slice(0, todoHoverId);
            const arrAfter = updatedCard[cardHoverId].slice(todoHoverId + 1);
            updatedCard[cardHoverId] = [...arrBefore, drugTodo, ...arrAfter];
            this.cards = [...updatedCard];

            this.alltables.myTables[this.idTable].ttodos = [...updatedCard];
        }

        if (cardDragId !== cardHoverId) {
            const updatedCard = [...this.cards];
            const arrBefore = updatedCard[cardHoverId].slice(0, todoHoverId);
            const arrAfter = updatedCard[cardHoverId].slice(todoHoverId);
            console.log(arrBefore);
            console.log(arrAfter);
            updatedCard[cardHoverId] = [...arrBefore, drugTodo, ...arrAfter];
            const deletedEl = updatedCard[cardDragId].splice(todoDrugId, 1);
            this.cards = [...updatedCard];

            this.alltables.myTables[this.idTable].ttodos = [...updatedCard];
        }
    }

}

export default new Todostore()