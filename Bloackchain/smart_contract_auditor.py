import re

SECURITY_RULES = [
    ("reentrancy", r"call\(.+\)"),
    ("integer_overflow", r"uint\d+\s+\w+\s*=\s*\w+\s*\+"),
    ("tx_origin_attack", r"tx\.origin"),
]

def audit_smart_contract(contract_code):
    issues = []
    for issue, pattern in SECURITY_RULES:
        if re.search(pattern, contract_code):
            issues.append(issue)
    return issues

if __name__ == "__main__":
    with open("contract.sol", "r") as f:
        solidity_code = f.read()
    
    findings = audit_smart_contract(solidity_code)
    print("Vulnerabilities found:", findings if findings else "No issues detected.")
