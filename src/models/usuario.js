class Usuario {
    constructor(id, nome, username, cpf) {
      this.id = id
      this.nome = nome
      this.username = username
      this.cpf = cpf
    }

    campoVazio() {
        return (!this.nome || !this.username || !this.cpf) 
    }
}