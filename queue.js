export default class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the end of the queue
    enqueue(element) {
        this.items.push(element);
    }
    
    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Remove an element from the front of the queue
    dequeue() {
        if (this.isEmpty()) {
            return 0;
        }
        return this.items.shift();
    }

    // Get the front element of the queue
    head() {
        if (this.isEmpty()) {
            return 0;
        }
        return this.items[0];
    }

    // Get the last element of the queue
    tail() {
        if (this.isEmpty()) {
            return 0;
        }
        if (this.items.length === 1) {
            return this.head();
        }
        return this.items[this.items.length - 1];
    }

    // Get the size of the queue
    size() {
        return this.items.length;
    }

    // Gets the element at the given index
    get(index) {
        if (index < 0 || index >= this.items.length) {
            return 0;
        }
        return this.items[index];
    }

    // reset the queue with a new element
    reset(element) {
        this.items = [element];
    }

    // for printing the elements of the queue
    dumpQueue() {
        return this.items.join(" ");
    }
}
