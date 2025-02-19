import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии переданного файла в формате .json
            --help:                      # печатает эту подсказку со списком команд
            --import <path>:             # импортирует данные из TSV файла
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `);
  }
}
