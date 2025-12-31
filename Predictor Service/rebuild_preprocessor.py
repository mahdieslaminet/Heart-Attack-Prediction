import pandas as pd
import numpy as np
import joblib
from ucimlrepo import fetch_ucirepo
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.impute import SimpleImputer

def load_cleveland():
    heart = fetch_ucirepo(id=45)
    X = heart.data.features.copy()
    X = X.replace("?", np.nan)
    return X

def build_preprocessor(X):
    known_cat = {"sex", "cp", "fbs", "restecg", "exang", "slope", "thal", "ca"}
    X = X.copy()
    X.columns = X.columns.astype(str)

    cat_cols = [c for c in X.columns if c in known_cat]
    num_cols = [c for c in X.columns if c not in known_cat]

    for c in num_cols:
        X[c] = pd.to_numeric(X[c], errors="coerce")

    for c in cat_cols:
        X[c] = X[c].astype(object)

    num_pipe = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", MinMaxScaler())
    ])

    cat_pipe = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])

    preprocessor = ColumnTransformer([
        ("num", num_pipe, num_cols),
        ("cat", cat_pipe, cat_cols)
    ])

    return X, preprocessor

X = load_cleveland()
X, preprocessor = build_preprocessor(X)
X = X.replace({pd.NA: np.nan})

preprocessor.fit(X)
joblib.dump(preprocessor, "artifacts/preprocessor.joblib")

print("✅ Preprocessor rebuilt and saved successfully")
