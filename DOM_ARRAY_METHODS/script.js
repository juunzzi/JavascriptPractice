const fetcher = async () => {
  const {
    results: [user],
  } = await (await fetch("https://randomuser.me/api/")).json();
  return new User(user);
};

class User {
  constructor({ name: { first, last } }) {
    this.name = first + last;
    this.money = this.getRandomMoney();
    this.node = this.createNode();
  }
  getRandomMoney = () => {
    return Math.floor(Math.random() * 10000000);
  };
  createNode = () => {
    const node = document.createElement("h3");
    const name = document.createElement("strong");
    const moneytag = document.createTextNode(this.money);
    name.innerText = this.name;
    node.appendChild(name);
    node.appendChild(moneytag);
    return node;
  };
}

class App {
  constructor() {
    this.aside = document.querySelector("aside");
    this.main = document.querySelector("#main");
    this.entireWealth = document.createElement("h3");
    this.users = [];
    this.setInitUsers();
  }
  setInitUsers = async () => {
    this.addUser(await fetcher());
    this.addUser(await fetcher());
    this.addUser(await fetcher());
  };
  addUser = (user) => {
    this.users.push(user);
    this.main.appendChild(user.node);
  };
  double = () => {
    this.users.forEach((user) => {
      user.money = user.money * 2;
      user.node.lastChild.textContent = user.money;
    });
  };
  showMillionaires = () => {
    this.users = this.users.filter((user) => {
      if (user.money < 1000000) {
        user.node.remove();
        return false;
      }
      return true;
    });
  };
  sort = () => {
    this.users = this.users.sort((a, b) => {
      if (a.money > b.money) {
        return -1;
      }
      if (a.money < b.money) {
        return 1;
      }
      return 0;
    });
    this.users.forEach((user, index) => {
      this.main.appendChild(user.node);
    });
  };
  calculateWealth = () => {
    if (this.main.contains(this.entireWealth)) {
      this.main.removeChild(this.entireWealth);
      return;
    }
    this.entireWealth.innerText = this.users.reduce(
      (ac, cur) => ac + cur.money,
      0
    );
    this.main.appendChild(this.entireWealth);
  };
}
const app = new App();
app.aside.addEventListener("click", async ({ target: { id } }) => {
  switch (id) {
    case "add_user":
      app.addUser(await fetcher());
      break;
    case "double":
      app.double();
      break;
    case "show-millionaires":
      app.showMillionaires();
      break;
    case "sort":
      app.sort();
      break;
    case "calculate-wealth":
      app.calculateWealth();
      break;
  }
});
