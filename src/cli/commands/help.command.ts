import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.green(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии переданного файла
            --help:                      # печатает эту подсказку со списком команд
            --import <path>:             # импортирует данные из TSV файла
                                             <path> - обязательный, путь к импортируемому файлу
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
                                             <n> - обязательный, количество предложений для генерации
                                             <path> - обязательный, путь к файлу для записи результата
                                             <url> - обязательный, url API для получения моковых данных
    `));
  }
}
