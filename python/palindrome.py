# Returns the first character of the string s
def firstCharacter(s):
    return s[0]

# Returns the last character of a string s
def lastCharacter(s):
    return s[-1]

# Returns the string that results from removing the first and last characters
def middleCharacters(s):
    return s[1:-1]

# Checks recursively whether the string is a palindrome
def isPalindrome(s):
    if len(s) <= 1:
        return True
    elif firstCharacter(s) == lastCharacter(s):
        return isPalindrome(middleCharacters(s))
    else:
        return False

# Calls the checker and prints the result
def checkPalindrome(s):
    print("Is this word a palindrome? " + s)
    print(isPalindrome(s))

# Testes
checkPalindrome("a")
checkPalindrome("motor")
checkPalindrome("xyxyxyxyxyx")
