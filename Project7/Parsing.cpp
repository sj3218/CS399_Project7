#include "Parsing.hpp"

Parsing::Parsing()
{
}

Parsing::~Parsing()
{
}

Parsing::Parsing(std::string file_path)
{
    ParsingTextFile(file_path);
}

void Parsing::WriteDataOnCSVFile()
{
    std::string file_path = m_file_path_name + ".csv";

    std::ofstream file(file_path.c_str());

    file << "Message" << "," << "Count" << std::endl;

    for (std::map<std::string, int>::iterator it = data.begin(); it != data.end(); ++it)
    {
        file << it->first << "," << it->second << std::endl;
        
    }

    file.close();
}

void Parsing::ParsingTextFile(std::string file_path)
{
    m_file_path_name = file_path.substr(0, file_path.find(".txt"));

    std::ifstream file;
    file.open(file_path.c_str());
    if (!file.is_open())
    {
        std::cout << "Error: file cannot open - " << file_path << std::endl;
    }
    
    std::string line;
    std::string delim_message = "message=\"";
    std::string delim_end = "\"";
    std::string delim_magic_number = "magic number";
    std::string delim_line_is_longer = "Line is longer than 80 characters";

    std::string delim_parameter = "Parameter";
    std::string delim_class_extension = "looks like designed for extension";

    std::string delim_javadoc = "Javadoc";
    std::string delim_package_java = "package-info.java";

    std::string delim_private = "must be private and have";
    std::string variable_private = "Variable must be private and have accessor methods.";

    std::string delim_import = "import should be avoided";
    std::string using_import = "Using form of import should be avoided";

    std::string delim_unused_import = "Unused import";

    std::string delim_name_match = "must match pattern";
    std::string name_must_match = "Name must match pattern";

    std::string delim_followed_by_whitespace = "is not followed by whitespace";
    std::string followed_by_whitespace = "Not followed by whitespace";

    std::string delim_preceded_with_whitespace = "is not preceded with whitespace";
    std::string preceded_with_whitespace = "Not preceded with whitespace";

    std::string delim_hides = "hides a field";
    std::string hides_field = "Hides a field";

    std::string delim_multi_block = "multi-block statement";
    std::string multi_block = "Should be on the same line as the next part of a multi-block statement";

    std::string token;
    
    while (!file.eof())
    {
        std::getline(file, line);
        if (line.find(delim_message) == std::string::npos)
        {
            continue;
        }

        token = line.substr(line.find(delim_message) + delim_message.size(), line.size()-1);
        token = token.substr(0, token.find(delim_end));

        if (token.find(delim_magic_number) != std::string::npos)
        {
            token = token.substr(token.find(delim_magic_number), line.size() - 1);
        }
        
        if (token.find(delim_line_is_longer) != std::string::npos)
        {
            token = delim_line_is_longer;
        }

        if (token.find(delim_parameter) != std::string::npos)
        {
            token = "Parameter should be final.";
        }

        if (token.find(delim_class_extension) != std::string::npos)
        {
            continue;
        }
        if (token.find(delim_javadoc) != std::string::npos)
        {
            continue;
        }
        if (token.find(delim_package_java) != std::string::npos)
        {
            continue;
        }


        if (token.find(delim_private) != std::string::npos)
        {
            token = variable_private;
        }

        if (token.find(delim_import) != std::string::npos)
        {
            token = using_import;
        }

        if (token.find(delim_unused_import) != std::string::npos)
        {

            token = delim_unused_import;
        }

        if (token.find(delim_name_match) != std::string::npos)
        {

            token = name_must_match;
        }

        if (token.find(delim_followed_by_whitespace) != std::string::npos)
        {

            token = followed_by_whitespace;
        }

        if (token.find(delim_preceded_with_whitespace) != std::string::npos)
        {

            token = preceded_with_whitespace;
        }
        
        if (token.find(delim_hides) != std::string::npos)
        {

            token = hides_field;
        }

        if (token.find(delim_multi_block) != std::string::npos)
        {

            token = multi_block;
        }

        if (data.find(token) != data.end())
        {
            data.at(token)++;
        }
        else
        {
            data.emplace(token, 1);
        }
    }

    file.close();

}
