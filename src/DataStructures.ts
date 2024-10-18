export class LinkedListNode<T> {
  constructor(public data: T, public next: LinkedListNode<T> | null = null) {}
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null = null;

  append(data: T): void {
    const newNode = new LinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class CircularLinkedListNode<T> {
  constructor(public data: T, public next: CircularLinkedListNode<T> | null = null) {}
}

export class CircularLinkedList<T> {
  head: CircularLinkedListNode<T> | null = null;
  tail: CircularLinkedListNode<T> | null = null;

  append(data: T): void {
    const newNode = new CircularLinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  delete(data: T): boolean {
    if (!this.head) return false;

    let current = this.head;
    let prev = this.tail;

    do {
      if (current.data === data) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else {
          prev.next = current.next;
          if (current === this.head) {
            this.head = current.next;
          }
          if (current === this.tail) {
            this.tail = prev;
          }
        }
        return true;
      }
      prev = current;
      current = current.next!;
    } while (current !== this.head);

    return false;
  }

  find(data: T): CircularLinkedListNode<T> | null {
    if (!this.head) return null;

    let current = this.head;
    do {
      if (current.data === data) {
        return current;
      }
      current = current.next!;
    } while (current !== this.head);

    return null;
  }

  size(): number {
    if (!this.head) return 0;

    let count = 0;
    let current = this.head;
    do {
      count++;
      current = current.next!;
    } while (current !== this.head);

    return count;
  }
}

export class DoublyLinkedListNode<T> {
  constructor(
    public data: T,
    public prev: DoublyLinkedListNode<T> | null = null,
    public next: DoublyLinkedListNode<T> | null = null
  ) {}
}

export class DoublyLinkedList<T> {
  head: DoublyLinkedListNode<T> | null = null;
  tail: DoublyLinkedListNode<T> | null = null;

  append(data: T): void {
    const newNode = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  delete(data: T): boolean {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        return true;
      }
      current = current.next;
    }
    return false;
  }
}