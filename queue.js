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
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // Get the front element of the queue
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    // Get the size of the queue
    size() {
        return this.items.length;
    }

    // Print the elements of the queue
    printQueue() {
        return this.items.join(" ");
    }
}
