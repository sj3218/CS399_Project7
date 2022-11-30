#include <iostream>
#include "Parsing.hpp"

int main()
{
    Parsing calculator("calculator.txt");
    Parsing brickbreaker("brickbreaker.txt");

    calculator.WriteDataOnCSVFile();
    brickbreaker.WriteDataOnCSVFile();

}