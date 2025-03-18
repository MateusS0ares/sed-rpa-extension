document.addEventListener('DOMContentLoaded', () => {
    // Botão para gerar planilha de Cadastro Estudante
    document.getElementById('startButton').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: clickButtons,
        });
      });
    });
  
    // Botão para gerar planilha de Renovação
    document.getElementById('renewalButton').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: clickRenewalButtons,
        });
      });
    });
  
    // Listener para mensagens de status
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.status) {
        document.getElementById('status').textContent = message.status;
      }
    });
  });

async function clickButtons() {
    if (!window.location.href.includes("iesinscricaolistartodosww.aspx")) {
        chrome.runtime.sendMessage({ status: "Esta extensão só funciona na página de Cadastro Estudante do SED." });
        return;
    }

    const xpaths = [
        '//button[@title="Seleciona colunas"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Nome Social "]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Nascimento"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Emancipado"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Matrícula na IES"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Município Residência"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Ano"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Fase"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Instituição"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Mensalidade Curso"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Você já possui uma graduação?"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Essa graduação foi cursada integralmente com recursos da assistência financeira do Programa Universidade Gratuita ou do FUMDESC?"]',
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

    await processXpaths(xpaths);
}

async function clickRenewalButtons() {
    if (!window.location.href.includes("iespalunobolsistacontinuidadeww.aspx")) {
        chrome.runtime.sendMessage({ status: "Esta extensão só funciona na página de Renovação Benefício do SED." });
        return;
    }

    const xpaths = [
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Nome Social"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Nome"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Código da Instituição"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Instituição"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Outros"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Projeto Intervenção"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="Edital"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="DDD/Tel. Res."]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="DDD/Tel. Com."]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="DDD/Tel. Celular"]',
        '//div[@class="FilterOptions FilterOptionsMultiSelection"]//a/span[@dsc="E-Mail"]',
        '//li//input[@value="Atualizar colunas"]',
    ];

    await processXpaths(xpaths);
}

async function processXpaths(xpaths) {
    for (let xpath of xpaths) {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            // Verifica se o elemento já está selecionado
            const isSelected = element.getAttribute('sel') === 'T';
            if (!isSelected) {
                console.log(`Elemento encontrado e clicado para o XPath: ${xpath}`);
                chrome.runtime.sendMessage({ status: `Elemento encontrado e clicado: ${xpath}` });
                element.click(); // Realiza o clique no elemento
                await new Promise(resolve => setTimeout(resolve, 250)); // Aguarda um tempo para evitar problemas de sincronização
            } else {
                console.log(`Elemento já selecionado (não clicado): ${xpath}`);
                chrome.runtime.sendMessage({ status: `Elemento já selecionado (não clicado): ${xpath}` });
            }
        } else {
            console.error(`Elemento não encontrado para o XPath: ${xpath}`);
            chrome.runtime.sendMessage({ status: `Erro: Elemento não encontrado para o XPath: ${xpath}` });
            return { status: "error" }; // Retorna erro se algum elemento não for encontrado
        }
    }

    // Após processar todos os XPaths, tenta clicar no botão de exportação para Excel
    const excelButton = document.evaluate('//input[@title="Exportar para Excel"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (excelButton) {
        console.log("Botão de exportação para Excel encontrado.");
        chrome.runtime.sendMessage({ status: "Botão de exportação para Excel encontrado. Aguardando..." });
        await new Promise(resolve => setTimeout(resolve, 6000)); // Aguarda antes de clicar no botão
        excelButton.click(); // Realiza o clique no botão de exportação
        chrome.runtime.sendMessage({ status: "Botão de baixar Excel clicado. Aguardando download..." });
        return { status: "excelClicked" }; // Retorna o status de sucesso
    } else {
        console.error("Botão de exportação para Excel não encontrado.");
        chrome.runtime.sendMessage({ status: "Erro: Botão de exportação para Excel não encontrado." });
        return { status: "error" }; // Retorna erro se o botão não for encontrado
    }
}
