const { getUser } = require("./githubApi");

global.fetch = jest.fn();

describe("Testando a API do GitHub", () => {
  it("Deve retornar dados de um usuário válido", async () => {
    const fakeUser = { login: "octocat", public_repos: 8 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeUser
    });

    const data = await getUser("octocat");
    expect(data.login).toBe("octocat");
    expect(data.public_repos).toBe(8);
  });

  it("Deve lançar erro para usuário inválido", async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(getUser("usuarioInvalido")).rejects.toThrow("Usuário não encontrado");
  });
});