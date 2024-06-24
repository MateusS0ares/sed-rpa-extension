document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.url === "https://sistemaensinosuperior.sed.sc.gov.br/iesinscricaolistartodosww.aspx") {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: clickButtons,
          }, (results) => {
            const result = results[0];
            if (result && result.status === "success") {
              document.getElementById('status').textContent = "Automação concluída com sucesso!";
            } else {
              document.getElementById('status').textContent = "Erro ao executar automação.";
            }
          });
        } else {
          document.getElementById('status').textContent = "Esta extensão só funciona na página específica do SED.";
        }
      });
    });
  });
  
  async function clickButtons() {
    const xpaths = [
      '//button[@title="Seleciona colunas"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Nome Social "]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Nascimento"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Emancipado"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Matrícula na IES"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Município Residência"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Fase"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Instituição"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Mensalidade Curso"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Possui Graduação"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Grad. Rec. Público SC"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Ingresso na IES"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Reside SC desde"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Renda per capita"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Renda"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Valor dos Bens"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Despesa com educação"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Transporte Coletivo"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Ensino Médio"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Possui Assist. Financeira Rec. Pub."]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Qual Assistência"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Despesa Habitação"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Doença Crônica"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Despesa Educação"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Situação Desemprego"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Programa"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Tipo"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="%"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="R$ Benefício"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Família"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Motivo Negado/Data Concessão"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Estado Naturalidade"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Munic. Naturalidade"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="DDD - Res."]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Telefone Res."]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="DDD - Com."]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Tefefone Comercial"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="DDD - Cel."]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Celular"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="E-mail"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Dt. Cadastro"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Alt. Cadastro"]',
      '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc=" Ensino Médio em Rede Púb. SC ou Inst. Privada bolsa parcial/Integ."]',
      '//li//input[@value="Atualizar colunas"]',
    ];
  
    for (let xpath of xpaths) {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (element) {
        element.click();
        await new Promise(resolve => setTimeout(resolve, 250)); // Espera 250ms antes de clicar no próximo botão
      } else {
        console.error(`Elemento não encontrado para o XPath: ${xpath}`);
        return { status: "error" };
      }
    }
  
    // Clicar no botão de exportar para Excel após um tempo maior para garantir que todos os botões tenham sido clicados
    const excelButton = document.evaluate('//input[@title="Exportar para Excel"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (excelButton) {
      await new Promise(resolve => setTimeout(resolve, 15000)); // Espera 15 segundos antes de exportar para Excel
      excelButton.click();
      return { status: "success" };
    } else {
      console.error("Botão de exportação para Excel não encontrado.");
      return { status: "error" };
    }
  }
  