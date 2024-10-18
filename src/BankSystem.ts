import { LinkedList, Stack, Queue, CircularLinkedList, DoublyLinkedList } from './DataStructures';

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  timestamp: Date;
}

interface Account {
  id: string;
  balance: number;
  transactions: LinkedList<Transaction>;
}

export class BankSystem {
  private accounts: Map<string, Account>;
  private transactionHistory: Stack<Transaction>;
  private pendingTransactions: Queue<Transaction>;
  private frequentCustomers: CircularLinkedList<string>;
  private customerGraph: Map<string, string[]>;
  private accountTree: BinarySearchTree<string, Account>;

  constructor() {
    this.accounts = new Map();
    this.transactionHistory = new Stack();
    this.pendingTransactions = new Queue();
    this.frequentCustomers = new CircularLinkedList();
    this.customerGraph = new Map();
    this.accountTree = new BinarySearchTree();
  }

  createAccount(id: string): void {
    const newAccount: Account = {
      id,
      balance: 0,
      transactions: new LinkedList(),
    };
    this.accounts.set(id, newAccount);
    this.accountTree.insert(id, newAccount);
  }

  deposit(accountId: string, amount: number): void {
    const account = this.accounts.get(accountId);
    if (account) {
      account.balance += amount;
      const transaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        amount,
        type: 'deposit',
        timestamp: new Date(),
      };
      account.transactions.append(transaction);
      this.transactionHistory.push(transaction);
      this.updateFrequentCustomers(accountId);
    }
  }

  withdraw(accountId: string, amount: number): boolean {
    const account = this.accounts.get(accountId);
    if (account && account.balance >= amount) {
      account.balance -= amount;
      const transaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        amount,
        type: 'withdrawal',
        timestamp: new Date(),
      };
      account.transactions.append(transaction);
      this.transactionHistory.push(transaction);
      this.updateFrequentCustomers(accountId);
      return true;
    }
    return false;
  }

  private updateFrequentCustomers(accountId: string): void {
    if (!this.frequentCustomers.find(accountId)) {
      this.frequentCustomers.append(accountId);
      if (this.frequentCustomers.size() > 10) {
        this.frequentCustomers.delete(this.frequentCustomers.head!.data);
      }
    }
  }

  getBalance(accountId: string): number | undefined {
    return this.accounts.get(accountId)?.balance;
  }

  getTransactionHistory(accountId: string): Transaction[] {
    const account = this.accounts.get(accountId);
    return account ? account.transactions.toArray() : [];
  }

  getGlobalTransactionHistory(): Transaction[] {
    return this.transactionHistory.toArray();
  }

  addCustomerRelationship(customer1: string, customer2: string): void {
    if (!this.customerGraph.has(customer1)) {
      this.customerGraph.set(customer1, []);
    }
    if (!this.customerGraph.has(customer2)) {
      this.customerGraph.set(customer2, []);
    }
    this.customerGraph.get(customer1)!.push(customer2);
    this.customerGraph.get(customer2)!.push(customer1);
  }

  getCustomerNetwork(accountId: string): string[] {
    const visited = new Set<string>();
    const queue = [accountId];
    visited.add(accountId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = this.customerGraph.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return Array.from(visited);
  }

  getAccountsByBalanceRange(minBalance: number, maxBalance: number): Account[] {
    return this.accountTree.rangeSearch(minBalance.toString(), maxBalance.toString());
  }
}

class BinarySearchTree<K extends string, V> {
  private root: BSTNode<K, V> | null = null;

  insert(key: K, value: V): void {
    this.root = this._insert(this.root, key, value);
  }

  private _insert(node: BSTNode<K, V> | null, key: K, value: V): BSTNode<K, V> {
    if (node === null) {
      return new BSTNode(key, value);
    }

    if (key < node.key) {
      node.left = this._insert(node.left, key, value);
    } else if (key > node.key) {
      node.right = this._insert(node.right, key, value);
    } else {
      node.value = value;
    }

    return node;
  }

  rangeSearch(min: K, max: K): V[] {
    const result: V[] = [];
    this._rangeSearch(this.root, min, max, result);
    return result;
  }

  private _rangeSearch(node: BSTNode<K, V> | null, min: K, max: K, result: V[]): void {
    if (node === null) {
      return;
    }

    if (min < node.key) {
      this._rangeSearch(node.left, min, max, result);
    }

    if (min <= node.key && node.key <= max) {
      result.push(node.value);
    }

    if (max > node.key) {
      this._rangeSearch(node.right, min, max, result);
    }
  }
}

class BSTNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public left: BSTNode<K, V> | null = null,
    public right: BSTNode<K, V> | null = null
  ) {}
}